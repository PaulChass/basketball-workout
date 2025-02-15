export interface Drill {
  title: string;
  duration: number | string;
  videoUrl?: string;
  instructions?: string;
  description?: string;
  tips?: string[];
  tags?: string[];
  timestamps?: { time: string; label: string }[];
  workoutSteps?: { title: string; description: string, type: string, time: string, countdown? :Number }[];
}