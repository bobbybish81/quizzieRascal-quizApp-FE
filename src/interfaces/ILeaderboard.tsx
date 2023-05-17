export interface IUserData {
  userId: string,
  username: string,
  totalPlays: number,
  totalScore: number,
  averageScore: string,
  quickestTime: number,
  totalTime: number,
  averageTime: number,  
}

export interface ILeaderboard {
  loading: boolean,
  userData: IUserData[],
  errorMessage: string,
}