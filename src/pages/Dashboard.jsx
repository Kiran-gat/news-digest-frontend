import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { logout } = useAuth();
  const [email, setEmail] = useState("");
  const [topics, setTopics] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(true);

  const [newTopic, setNewTopic] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await apiRequest("/api/user/profile");
      setEmail(data.email);
      setTopics(data.topics || []);
      setIsSubscribed(data.isSubscribed);
    } catch {
      setMessage("Failed to load profile");
    }
  };

  const toggleSubscription = async () => {
    try {
      const data = await apiRequest("/api/user/subscription", {
        method: "POST",
        body: JSON.stringify({ isSubscribed: !isSubscribed }),
      });
      setIsSubscribed(data.isSubscribed);
    } catch {
      setMessage("Failed to update subscription");
    }
  };

  const addTopic = async () => {
    if (!newTopic.trim()) return;

    try {
      await apiRequest("/api/user/topics/add", {
        method: "POST",
        body: JSON.stringify({ topic: newTopic }),
      });
      setNewTopic("");
      fetchProfile();
    } catch {
      setMessage("Failed to add topic");
    }
  };

  const removeTopic = async (topic) => {
    try {
      await apiRequest("/api/user/topics/remove", {
        method: "POST",
        body: JSON.stringify({ topic }),
      });
      fetchProfile();
    } catch {
      setMessage("Failed to remove topic");
    }
  };

  const sendManualEmail = async () => {
    setLoading(true);
    setMessage("");

    try {
      const data = await apiRequest("/api/email/sendManual", {
        method: "POST",
      });
      setMessage(data.message || "Email sent successfully");
    } catch {
      setMessage("Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-purple-400">
            Welcome, {email}
          </h1>
          <p className="text-gray-400 mt-1">
            Manage your news preferences and subscription
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* SUBSCRIPTION CARD */}
          <div className="bg-slate-800/70 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Email Subscription
            </h2>

            <div className="flex items-center justify-between">
              <span className="text-gray-300">
                {isSubscribed ? "Enabled" : "Disabled"}
              </span>

              {/* TOGGLE */}
              <button
                onClick={toggleSubscription}
                className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
                  isSubscribed ? "bg-purple-600" : "bg-gray-600"
                }`}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full shadow-md transform transition ${
                    isSubscribed ? "translate-x-7" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* MANUAL EMAIL CARD */}
          <div className="bg-slate-800/70 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Manual Digest
            </h2>

            <button
              onClick={sendManualEmail}
              disabled={loading}
              className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition font-semibold"
            >
              {loading ? "Sending..." : "Send News Email"}
            </button>
          </div>

          {/* TOPICS CARD */}
          <div className="md:col-span-2 bg-slate-800/70 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Your Topics
            </h2>

            <div className="flex flex-wrap gap-2 mb-4">
              {topics.length === 0 && (
                <p className="text-gray-400">No topics added yet</p>
              )}

              {topics.map((topic) => (
                <span
                  key={topic}
                  className="flex items-center gap-2 bg-purple-700/30 px-3 py-1 rounded-full text-sm"
                >
                  {topic}
                  <button
                    onClick={() => removeTopic(topic)}
                    className="text-red-400 hover:text-red-300"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add new topic"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                className="flex-1 px-3 py-2 rounded bg-slate-700 outline-none"
              />
              <button
                onClick={addTopic}
                className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        {message && (
          <p className="mt-6 text-center text-sm text-green-400">
            {message}
          </p>
        )}

        <div className="mt-10 text-center">
          <button
            onClick={logout}
            className="text-red-400 hover:underline"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
