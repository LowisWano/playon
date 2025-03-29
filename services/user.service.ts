import { api } from "@/config/axios";
import { PlayOnUserData } from "@/types/entities/UserEntity";

export class UserService {
  private static prefix = '/auth/app';
  static async getAllPlayOnUsers(searchName: string, userId: number) {
    try {
      const users = await api.get<PlayOnUserData[]>(`${this.prefix}/all-users/${searchName}/${userId}`).then((res) => res.data);
      return users;
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  }
}