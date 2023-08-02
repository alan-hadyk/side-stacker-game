export const GAME_ID = "13b66249-f01a-4c68-8750-c8d42ab07675"
export const PLAYER_1_ID = "13b66249-f01a-4c68-8750-c8d42ab07675"
export const PLAYER_2_ID = "6c349d70-7d1b-41ae-8579-8d6282091403"

export const openGameMock = {
  created_at: "2023-07-31T14:29:36.948Z",
  current_board_status: [
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "O"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "X"],
    ["O", "X", "empty", "empty", "O", "X", "X"],
    ["empty", "empty", "empty", "O", "X", "O", "X"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "O"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty"],
  ],
  current_game_state: "waiting_for_players",
  finished_at: null,
  game_id: GAME_ID,
  name: "Thoughtful Gregar Typho",
  next_possible_moves: [
    [0, 0],
    [0, 6],
    [1, 0],
    [1, 5],
    [2, 0],
    [2, 5],
    [3, 2],
    [3, 3],
    [4, 0],
    [4, 2],
    [5, 0],
    [5, 5],
    [6, 0],
    [6, 6],
  ],
  number_of_moves: 12,
  player1_id: PLAYER_1_ID,
  player2_id: null,
  winner_id: null,
  winning_moves: null,
}

export const gameInProgressMock = {
  created_at: "2023-07-30T14:24:40.790Z",
  current_board_status: [
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["X", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["O", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["X", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["X", "empty", "empty", "empty", "empty", "empty", "O"],
    ["X", "empty", "empty", "empty", "empty", "empty", "O"],
    ["O", "X", "empty", "empty", "empty", "O", "X"],
  ],
  current_game_state: "in_progress",
  finished_at: null,
  game_id: GAME_ID,
  name: "Voluntary Jar Jar Binks",
  next_possible_moves: [
    [0, 0],
    [0, 6],
    [1, 1],
    [1, 6],
    [2, 1],
    [2, 6],
    [3, 1],
    [3, 6],
    [4, 1],
    [4, 5],
    [5, 1],
    [5, 5],
    [6, 2],
    [6, 4],
  ],
  number_of_moves: 11,
  player1_id: PLAYER_1_ID,
  player2_id: PLAYER_2_ID,
  winner_id: null,
  winning_moves: null,
}

export const finishedGameMock = {
  created_at: "2023-07-31T21:45:46.209Z",
  current_board_status: [
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["X", "X", "X", "O", "X", "empty", "empty"],
    ["X", "O", "O", "X", "O", "X", "O"],
    ["O", "O", "X", "X", "O", "X", "X"],
    ["X", "X", "O", "O", "X", "O", "X"],
    ["O", "X", "O", "O", "X", "O", "O"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty"],
  ],
  current_game_state: "finished",
  finished_at: "2023-07-31T21:52:52.768Z",
  game_id: "6a6b0861-27ad-4766-9ef5-26e6cfa88ef7",
  name: "Known Jango Fett",
  next_possible_moves: [],
  number_of_moves: 33,
  player1_id: PLAYER_1_ID,
  player2_id: PLAYER_2_ID,
  winner_id: PLAYER_1_ID,
  winning_moves: [
    [4, 1],
    [3, 2],
    [2, 3],
    [1, 4],
  ],
}

export const player1Mock = {
  created_at: "2023-07-25T21:29:12.747Z",
  deleted_at: null,
  is_online: true,
  last_active_at: "2023-08-02T09:26:10.038Z",
  player_id: PLAYER_1_ID,
  username: "FullStacker",
}

export const currentUserMock = {
  created_at: "2023-07-26T20:30:16.751Z",
  deleted_at: null,
  is_online: false,
  last_active_at: "2023-08-01T09:22:41.431Z",
  player_id: PLAYER_2_ID,
  username: "John",
}