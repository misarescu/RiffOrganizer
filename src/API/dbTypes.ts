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
          id?: string;
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
          artist_name: string | null;
          id: string;
          song_name: string | null;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          artist_name?: string | null;
          id?: string;
          song_name?: string | null;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          artist_name?: string | null;
          id?: string;
          song_name?: string | null;
          updated_at?: string | null;
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
