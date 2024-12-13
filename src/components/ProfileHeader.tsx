import { User } from 'firebase/auth';

interface ProfileHeaderProps {
  user: User | null;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="flex items-center gap-8 mb-8">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
        {user?.displayName ? user.displayName[0].toUpperCase() : 'U'}
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-2">{user?.displayName || 'User'}</h1>
        <p className="text-gray-600">{user?.email}</p>
      </div>
    </div>
  );
}