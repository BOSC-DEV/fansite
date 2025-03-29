
// This file contains type definitions for our Supabase database
// These types are used to provide type safety when accessing the database

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          wallet_address: string;
          display_name: string;
          username: string | null;
          profile_pic_url: string | null;
          created_at: string;
          x_link: string | null;
          website_link: string | null;
          bio: string | null;
          points: number | null;
        };
        Insert: {
          id: string;
          wallet_address: string;
          display_name: string;
          username?: string | null;
          profile_pic_url?: string | null;
          created_at?: string;
          x_link?: string | null;
          website_link?: string | null;
          bio?: string | null;
          points?: number | null;
        };
        Update: {
          id?: string;
          wallet_address?: string;
          display_name?: string;
          username?: string | null;
          profile_pic_url?: string | null;
          created_at?: string;
          x_link?: string | null;
          website_link?: string | null;
          bio?: string | null;
          points?: number | null;
        };
      };
      comments: {
        Row: {
          id: string;
          scammer_id: string;
          content: string;
          author: string;
          author_name: string;
          author_profile_pic: string | null;
          created_at: string;
          likes: number;
          dislikes: number;
          views: number;
        };
        Insert: {
          id: string;
          scammer_id: string;
          content: string;
          author: string;
          author_name: string;
          author_profile_pic?: string | null;
          created_at?: string;
          likes?: number;
          dislikes?: number;
          views?: number;
        };
        Update: {
          id?: string;
          scammer_id?: string;
          content?: string;
          author?: string;
          author_name?: string;
          author_profile_pic?: string | null;
          created_at?: string;
          likes?: number;
          dislikes?: number;
          views?: number;
        };
      };
      user_comment_interactions: {
        Row: {
          id: string;
          comment_id: string;
          user_id: string;
          liked: boolean;
          disliked: boolean;
          last_updated: string;
        };
        Insert: {
          id?: string;
          comment_id: string;
          user_id: string;
          liked: boolean;
          disliked: boolean;
          last_updated?: string;
        };
        Update: {
          id?: string;
          comment_id?: string;
          user_id?: string;
          liked?: boolean;
          disliked?: boolean;
          last_updated?: string;
        };
      };
      scammers: {
        Row: {
          id: string;
          name: string;
          photo_url: string | null;
          accused_of: string | null;
          links: string[];
          aliases: string[];
          accomplices: string[];
          official_response: string | null;
          bounty_amount: number | null;
          wallet_address: string | null;
          date_added: string;
          added_by: string | null;
          likes: number | null;
          dislikes: number | null;
          views: number | null;
          shares: number | null;
          comments: string[] | null;
          deleted_at: string | null;
        };
        Insert: {
          id: string;
          name: string;
          photo_url?: string | null;
          accused_of?: string | null;
          links?: string[];
          aliases?: string[];
          accomplices?: string[];
          official_response?: string | null;
          bounty_amount?: number | null;
          wallet_address?: string | null;
          date_added: string;
          added_by?: string | null;
          likes?: number | null;
          dislikes?: number | null;
          views?: number | null;
          shares?: number | null;
          comments?: string[] | null;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          photo_url?: string | null;
          accused_of?: string | null;
          links?: string[];
          aliases?: string[];
          accomplices?: string[];
          official_response?: string | null;
          bounty_amount?: number | null;
          wallet_address?: string | null;
          date_added?: string;
          added_by?: string | null;
          likes?: number | null;
          dislikes?: number | null;
          views?: number | null;
          shares?: number | null;
          comments?: string[] | null;
          deleted_at?: string | null;
        };
      };
      scammer_views: {
        Row: {
          id: string;
          scammer_id: string;
          ip_hash: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          scammer_id: string;
          ip_hash: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          scammer_id?: string;
          ip_hash?: string;
          created_at?: string;
        };
      };
      user_scammer_interactions: {
        Row: {
          id: string;
          user_id: string;
          scammer_id: string;
          liked: boolean;
          disliked: boolean;
          last_updated: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          scammer_id: string;
          liked: boolean;
          disliked: boolean;
          last_updated?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          scammer_id?: string;
          liked?: boolean;
          disliked?: boolean;
          last_updated?: string;
        };
      };
      leaderboard_stats: {
        Row: {
          id: string;
          wallet_address: string;
          total_reports: number;
          total_views: number;
          total_likes: number;
          total_comments: number;
          total_bounty: number;
          last_updated: string;
        };
        Insert: {
          id?: string;
          wallet_address: string;
          total_reports?: number;
          total_views?: number;
          total_likes?: number;
          total_comments?: number;
          total_bounty?: number;
          last_updated?: string;
        };
        Update: {
          id?: string;
          wallet_address?: string;
          total_reports?: number;
          total_views?: number;
          total_likes?: number;
          total_comments?: number;
          total_bounty?: number;
          last_updated?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
