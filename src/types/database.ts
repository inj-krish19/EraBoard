export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id:           string;
          username:     string | null;
          display_name: string | null;
          avatar_url:   string | null;
          created_at:   string;
          updated_at:   string;
        };
        Insert: {
          id:            string;
          username?:     string | null;
          display_name?: string | null;
          avatar_url?:   string | null;
          created_at?:   string;
          updated_at?:   string;
        };
        Update: {
          id?:           string;
          username?:     string | null;
          display_name?: string | null;
          avatar_url?:   string | null;
          updated_at?:   string;
        };
      };
      boards: {
        Row: {
          id:             string;
          user_id:        string | null;
          board_id:       string;
          aesthetic_name: string;
          era_name:       string;
          bio:            string;
          affirmation:    string | null;
          era_month:      string | null;
          playlist:       string | null;
          colors:         string[];
          images:         string[];
          tags:           string[];
          quiz_answers:   Json;
          is_public:      boolean;
          created_at:     string;
        };
        Insert: {
          id?:            string;
          user_id?:       string | null;
          board_id:       string;
          aesthetic_name: string;
          era_name:       string;
          bio:            string;
          affirmation?:   string | null;
          era_month?:     string | null;
          playlist?:      string | null;
          colors:         string[];
          images:         string[];
          tags:           string[];
          quiz_answers:   Json;
          is_public?:     boolean;
          created_at?:    string;
        };
        Update: {
          aesthetic_name?: string;
          era_name?:       string;
          bio?:            string;
          affirmation?:    string | null;
          era_month?:      string | null;
          playlist?:       string | null;
          colors?:         string[];
          images?:         string[];
          tags?:           string[];
          is_public?:      boolean;
        };
      };
    };
    Views:     { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums:     { [_ in never]: never };
  };
};

export type Profile     = Database["public"]["Tables"]["profiles"]["Row"];
export type Board       = Database["public"]["Tables"]["boards"]["Row"];
export type BoardInsert = Database["public"]["Tables"]["boards"]["Insert"];