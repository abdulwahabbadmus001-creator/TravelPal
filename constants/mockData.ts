export const mockGroups = [
  {
    id: "1",
    name: "Lagos to Abuja Road Trip",
    destination: "Abuja",
    members: 4,
    maxMembers: 8,
    isPrivate: false,
    trustScore: 78,
    image: "https://picsum.photos/400/200?random=1",
    description: "Looking for travel companions for a Lagos to Abuja road trip this weekend.",
    owner: "Chidi Okeke",
  },
  {
    id: "2",
    name: "Zanzibar Beach Squad",
    destination: "Zanzibar",
    members: 6,
    maxMembers: 10,
    isPrivate: false,
    trustScore: 85,
    image: "https://picsum.photos/400/200?random=2",
    description: "Planning a 7-day Zanzibar trip in July. All welcome.",
    owner: "Amina Yusuf",
  },
  {
    id: "3",
    name: "Accra Culture Trip",
    destination: "Accra",
    members: 3,
    maxMembers: 6,
    isPrivate: true,
    trustScore: 91,
    image: "https://picsum.photos/400/200?random=3",
    description: "Private group for verified travellers heading to Accra in August.",
    owner: "Taiwo Adeyemi",
  },
  {
    id: "4",
    name: "Cape Town Adventure",
    destination: "Cape Town",
    members: 5,
    maxMembers: 8,
    isPrivate: false,
    trustScore: 67,
    image: "https://picsum.photos/400/200?random=4",
    description: "Cape Town trip planned for September. Outdoor activities and city tours.",
    owner: "Ngozi Eze",
  },
];

export const mockMessages = [
  {
    id: "1",
    text: "Hey everyone, really excited about this trip!",
    sender: "Chidi Okeke",
    senderId: "user1",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    text: "Same here! Has everyone sorted their accommodation?",
    sender: "Amina Yusuf",
    senderId: "user2",
    timestamp: "10:32 AM",
  },
  {
    id: "3",
    text: "I found a great Airbnb for all of us. Sharing the link now.",
    sender: "Taiwo Adeyemi",
    senderId: "user3",
    timestamp: "10:35 AM",
  },
  {
    id: "4",
    text: "Perfect. What time are we leaving on Friday?",
    sender: "Ngozi Eze",
    senderId: "user4",
    timestamp: "10:37 AM",
  },
];

export const mockUser = {
  id: "currentUser",
  name: "Wahab Badmus",
  email: "wahab@travelpal.com",
  trustScore: 82,
  isVerified: true,
  tripsCompleted: 5,
  memberSince: "January 2025",
  bio: "Passionate traveller. Love exploring African cities and cultures.",
};

export const mockGroupMembers: Record<string, Array<{
  id: string;
  name: string;
  trustScore: number;
  isVerified: boolean;
  role: string;
  joinedDate: string;
}>> = {
  "1": [
    { id: "user1", name: "Chidi Okeke", trustScore: 78, isVerified: true, role: "owner", joinedDate: "Jan 2025" },
    { id: "user2", name: "Amina Yusuf", trustScore: 85, isVerified: true, role: "member", joinedDate: "Feb 2025" },
    { id: "user3", name: "Taiwo Adeyemi", trustScore: 91, isVerified: false, role: "member", joinedDate: "Mar 2025" },
    { id: "user4", name: "Ngozi Eze", trustScore: 67, isVerified: true, role: "member", joinedDate: "Mar 2025" },
  ],
  "2": [
    { id: "user5", name: "Emeka Obi", trustScore: 82, isVerified: true, role: "owner", joinedDate: "Jan 2025" },
    { id: "user6", name: "Fatima Bello", trustScore: 74, isVerified: false, role: "member", joinedDate: "Feb 2025" },
  ],
  "3": [
    { id: "user7", name: "Yusuf Musa", trustScore: 90, isVerified: true, role: "owner", joinedDate: "Dec 2024" },
    { id: "user8", name: "Kemi Adebayo", trustScore: 88, isVerified: true, role: "member", joinedDate: "Jan 2025" },
    { id: "user9", name: "Tunde Lawal", trustScore: 35, isVerified: false, role: "member", joinedDate: "Feb 2025" },
  ],
  "4": [
    { id: "user10", name: "Blessing Okon", trustScore: 76, isVerified: true, role: "owner", joinedDate: "Nov 2024" },
    { id: "user11", name: "Ayo Adeleke", trustScore: 55, isVerified: false, role: "member", joinedDate: "Jan 2025" },
    { id: "user12", name: "Zara Hassan", trustScore: 69, isVerified: true, role: "member", joinedDate: "Feb 2025" },
  ],
};

export const mockJoinRequests: Record<string, Array<{
  id: string;
  name: string;
  trustScore: number;
  isVerified: boolean;
  requestDate: string;
  message: string;
}>> = {
  "1": [
    { id: "req1", name: "Daniel Osei", trustScore: 72, isVerified: true, requestDate: "Today", message: "Would love to join this trip. I am an experienced traveller." },
    { id: "req2", name: "Sade Williams", trustScore: 45, isVerified: false, requestDate: "Yesterday", message: "This destination is on my bucket list!" },
  ],
  "3": [
    { id: "req3", name: "Musa Ibrahim", trustScore: 88, isVerified: true, requestDate: "Today", message: "Accra is my hometown. Happy to be a local guide for the group." },
  ],
  "4": [],
  "2": [],
};

export const mockBlockedUsers: Array<{
  id: string;
  name: string;
  blockedDate: string;
  reason: string;
}> = [
  { id: "blocked1", name: "Unknown User", blockedDate: "Last week", reason: "Spam" },
];