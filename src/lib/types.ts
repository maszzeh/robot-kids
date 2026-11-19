// Types for Robot Kids Educational Platform

export type GameMode = 
  | 'welcome' 
  | 'intro-story'
  | 'robot-builder' 
  | 'code-runner' 
  | 'sensor-lab' 
  | 'real-world' 
  | 'quiz';

// 1. Robot Builder Types
export type RobotPartCategory = 'head' | 'body' | 'arms' | 'legs' | 'accessory';

export interface RobotPart {
  id: string;
  name: string;
  category: RobotPartCategory;
  description: string;
  funFact: string;
  iconName: string;
  accentColor: string;
  stats: {
    sensorPower: number;   // 1 - 5
    batteryEnergy: number; // 1 - 5
    armStrength: number;   // 1 - 5
    movementSpeed: number; // 1 - 5
  };
}

export interface CustomRobotConfig {
  name: string;
  headId: string;
  bodyId: string;
  armsId: string;
  legsId: string;
  accessoryId: string;
  primaryColor: string;
}

// 2. Coding Runner Types
export type Direction = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';

export type CommandAction = 
  | 'FORWARD' 
  | 'BACKWARD' 
  | 'TURN_LEFT' 
  | 'TURN_RIGHT' 
  | 'BEEP' 
  | 'GRAB';

export interface CommandBlock {
  id: string;
  action: CommandAction;
  label: string;
  icon: string;
  color: string;
}

export type TileContent = 'EMPTY' | 'START' | 'TARGET' | 'BATTERY' | 'OBSTACLE_ROCK' | 'OBSTACLE_WATER' | 'GEAR';

export interface GridItem {
  pos: [number, number]; // [row, col]
  type: 'battery' | 'gear';
  collected?: boolean;
}

export interface CodingLevel {
  id: number;
  title: string;
  story: string;
  instruction: string;
  gridRows: number;
  gridCols: number;
  startPos: [number, number];
  startDirection: Direction;
  targetPos: [number, number];
  obstacles: [number, number][];
  items: GridItem[];
  availableCommands: CommandAction[];
  maxCommands: number;
  hint: string;
}

// 3. Sensor Lab Types
export type SensorLabType = 'distance' | 'light' | 'temperature' | 'metal';

export interface SensorInfo {
  type: SensorLabType;
  title: string;
  subtitle: string;
  organEquivalent: string; // Misal: "Seperti Mata & Telinga Kelelawar"
  concept: string;
  color: string;
}

// 4. Real World Robots
export interface RealRobot {
  id: string;
  name: string;
  category: string;
  field: string; // e.g. "Luar Angkasa", "Rumah Sakit", "Rumah Tangga"
  tagline: string;
  emoji: string;
  description: string;
  superPowers: string[];
  realWorldImpact: string;
  quizFact: string;
}

// 5. Quiz & Badges
export interface QuizQuestion {
  id: number;
  question: string;
  hint: string;
  options: {
    id: string;
    text: string;
    emoji: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface PlayerProgress {
  stars: number;
  completedLevels: number[];
  discoveredSensors: SensorLabType[];
  builtRobotsCount: number;
  quizCompleted: boolean;
  playerName: string;
}
