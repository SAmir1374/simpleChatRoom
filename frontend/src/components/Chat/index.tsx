import { UserStore } from '@/store/users';
import { SelfStore } from '@/store/self';
import { useEffect, useState } from 'react';
import { socket } from '@/api/socket';

type MessageType = {
  from: number;
  to: number;
  text: string;
};

function ChatPage() {
  const { users } = UserStore();
  const { self } = SelfStore();
  const [currentChat, setCurrentChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState<string>('');
  const [messages, setMessages] = useState<MessageType[]>([]);

  // ثبت کاربر فقط یک بار هنگام mount یا تغییر self.id
  useEffect(() => {
    if (self?.id) {
      socket.emit('register', self.id);
    }
  }, [self?.id]);

  // دریافت پیام‌های خصوصی
  useEffect(() => {
    const handleMessage = (msg: MessageType) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on('chat_message', handleMessage);

    socket.on('connect', () => {
      console.log('connected with id:', socket.id);
    });

    return () => {
      socket.off('chat_message', handleMessage);
      socket.off('connect');
    };
  }, []);

  // ارسال پیام
  const handleClick = () => {
    if (!newMessage.trim() || currentChat === null || !self?.id) return;

    const msg: MessageType = {
      from: self.id,
      to: currentChat,
      text: newMessage,
    };

    socket.emit('message', msg);
    setMessages((prev) => [...prev, msg]); // نمایش فوری در چت فرستنده
    setNewMessage('');
  };

  // فیلتر پیام‌ها برای چت جاری
  const filteredMessages = messages.filter(
    (m) =>
      (m.from === currentChat && m.to === self?.id) || (m.from === self?.id && m.to === currentChat)
  );

  return (
    <div className="flex min-h-[90dvh] bg-gray-100">
      {/* لیست کاربران */}
      <div className="w-1/4 bg-white shadow-md p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Users</h2>
        <ul className="space-y-2">
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => setCurrentChat(user.id!)}
              className={`cursor-pointer px-4 py-2 rounded-md hover:bg-orange-100 transition-colors ${
                currentChat === user.id ? 'bg-orange-200 font-semibold' : ''
              }`}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      {/* بخش چت */}
      <div className="flex-1 p-6 flex flex-col">
        {currentChat ? (
          <div className="flex-1 bg-white rounded-lg shadow-inner p-4 flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Chat with {users.find((u) => u.id === currentChat)?.username}
              </h3>
              <div className="flex-1 overflow-y-auto border-t border-gray-200 pt-4">
                {filteredMessages.length === 0 ? (
                  <p className="text-gray-500">Messages will appear here...</p>
                ) : (
                  filteredMessages.map((msg, indx) => (
                    <p
                      key={indx}
                      className={`p-4 rounded-lg my-2 ${
                        msg.from === self?.id ? 'bg-green-300' : 'bg-orange-100'
                      }`}
                    >
                      {msg.text}
                    </p>
                  ))
                )}
              </div>
            </div>
            <div className="mt-4 flex gap-3 items-end">
              <textarea
                className="flex-1 border rounded-lg p-2 resize-none overflow-y-auto
                  min-h-[2.5rem] max-h-[10rem] focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(event) => setNewMessage(event.target.value)}
              />
              <button
                type="submit"
                className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition"
                onClick={handleClick}
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatPage;
