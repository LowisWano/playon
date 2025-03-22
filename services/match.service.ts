import { Match } from "@/types/match.types";

const mockMatches: Match[] = [
  {
    sport: "Basketball",
    author: "John Doe",
    venue: "Central Park Court",
    skillLevel: "Intermediate",
    dateTime: "2024-03-25 18:00",
    participantsCount: 8,
    description:
      "Join us for a fun game of basketball at Central Park Court. We'll have a great time playing and getting to know each other. Bring your friends and come ready to play!",
  },
  {
    sport: "Soccer",
    author: "Jane Smith",
    venue: "Community Field",
    skillLevel: "Advanced",
    dateTime: "2024-03-26 17:30",
    participantsCount: 12,
    description:
      "Join us for a fun game of soccer at Community Field. We'll have a great time playing and getting to know each other. Bring your friends and come ready to play!",
  },
  {
    sport: "Basketball",
    author: "John Doe",
    venue: "Central Park Court",
    skillLevel: "Intermediate",
    dateTime: "2024-03-25 18:00",
    participantsCount: 8,
    description:
      "Join us for a fun game of basketball at Central Park Court. We'll have a great time playing and getting to know each other. Bring your friends and come ready to play!",
  },
];

export const matchService = {
  getActiveMatches: async (): Promise<Match[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockMatches;
  },
  
  getRecommendedMatches: async (): Promise<Match[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockMatches;
  }
};