export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      sections: {
        Row: {
          id: string;
          name: string | null;
          song_id: string;
          status: string | null;
        };
        Insert: {
          id: string;
          name?: string | null;
          song_id: string;
          status?: string | null;
        };
        Update: {
          id?: string;
          name?: string | null;
          song_id?: string;
          status?: string | null;
        };
      };
      songs: {
        Row: {
          created_at: string | null;
          id: string;
          name: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          name?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          name?: string | null;
          user_id?: string;
        };
      };
      user_info: {
        Row: {
          email: string | null;
          full_name: string | null;
          id: string;
        };
        Insert: {
          email?: string | null;
          full_name?: string | null;
          id: string;
        };
        Update: {
          email?: string | null;
          full_name?: string | null;
          id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
