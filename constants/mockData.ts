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
    owner: "Wahab Badmus",
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

export interface Member {
  id: string;
  name: string;
  trustScore: number;
  role: 'owner' | 'member';
  isBlocked?: boolean;
}

export interface JoinRequest {
  id: string;
  name: string;
  trustScore: number;
  bio: string;
}

export const mockGroupMembers: Record<string, Member[]> = {
  "1": [
    { id: "owner1", name: "Wahab Badmus", trustScore: 82, role: "owner" },
    { id: "member1", name: "Chidi Okeke", trustScore: 78, role: "member" },
    { id: "member2", name: "Amina Yusuf", trustScore: 85, role: "member" },
    { id: "member3", name: "Taiwo Adeyemi", trustScore: 91, role: "member" },
  ],
  "2": [
    { id: "owner2", name: "Amina Yusuf", trustScore: 85, role: "owner" },
    { id: "member1", name: "Chidi Okeke", trustScore: 78, role: "member" },
    { id: "member4", name: "Ngozi Eze", trustScore: 67, role: "member" },
    { id: "member5", name: "Traveller D", trustScore: 72, role: "member" },
    { id: "member6", name: "Traveller E", trustScore: 80, role: "member" },
    { id: "member7", name: "Traveller F", trustScore: 74, role: "member" },
  ],
  "3": [
    { id: "owner3", name: "Taiwo Adeyemi", trustScore: 91, role: "owner" },
    { id: "member8", name: "Traveller A", trustScore: 88, role: "member" },
    { id: "member9", name: "Traveller B", trustScore: 85, role: "member" },
  ],
  "4": [
    { id: "owner4", name: "Ngozi Eze", trustScore: 67, role: "owner" },
    { id: "member8", name: "Traveller A", trustScore: 88, role: "member" },
    { id: "member9", name: "Traveller B", trustScore: 85, role: "member" },
    { id: "member10", name: "Traveller C", trustScore: 90, role: "member" },
    { id: "member11", name: "Traveller D", trustScore: 75, role: "member" },
  ],
};

export const mockJoinRequests: Record<string, JoinRequest[]> = {
  "1": [
    { id: "req1", name: "Emeka Obi", trustScore: 88, bio: "Love road trips and mapping. Would love to join you guys!" },
    { id: "req2", name: "Fatima Bello", trustScore: 45, bio: "Going to Abuja for a family meeting, looking for a safe group." },
    { id: "req3", name: "John Doe", trustScore: 22, bio: "Just looking for a cheap ride." },
  ],
  "2": [
    { id: "req4", name: "Taiwo Adeyemi", trustScore: 91, bio: "Zanzibar has been on my bucket list for a long time!" },
  ],
  "3": [],
  "4": [],
};

export const mockBlockedUsers: Record<string, string[]> = {
  "1": [],
  "2": [],
  "3": [],
  "4": [],
};