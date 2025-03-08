
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          role: 'volunteer' | 'ngo' | 'admin'
          profile_image: string | null
          location: string | null
          bio: string | null
          created_at: string
          approved: boolean
        }
        Insert: {
          id?: string
          name: string
          email: string
          role: 'volunteer' | 'ngo' | 'admin'
          profile_image?: string | null
          location?: string | null
          bio?: string | null
          created_at?: string
          approved?: boolean
        }
        Update: {
          id?: string
          name?: string
          email?: string
          role?: 'volunteer' | 'ngo' | 'admin'
          profile_image?: string | null
          location?: string | null
          bio?: string | null
          created_at?: string
          approved?: boolean
        }
      }
      opportunities: {
        Row: {
          id: string
          title: string
          description: string
          organization: string
          organization_id: string
          organization_logo: string | null
          type: 'volunteer' | 'donation'
          category: string
          location: string
          is_remote: boolean
          start_date: string | null
          end_date: string | null
          urgency: 'low' | 'medium' | 'high' | 'critical'
          status: 'active' | 'completed' | 'cancelled'
          required_skills: string[] | null
          items: string[] | null
          contact_email: string
          contact_phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          organization: string
          organization_id: string
          organization_logo?: string | null
          type: 'volunteer' | 'donation'
          category: string
          location: string
          is_remote: boolean
          start_date?: string | null
          end_date?: string | null
          urgency: 'low' | 'medium' | 'high' | 'critical'
          status?: 'active' | 'completed' | 'cancelled'
          required_skills?: string[] | null
          items?: string[] | null
          contact_email: string
          contact_phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          organization?: string
          organization_id?: string
          organization_logo?: string | null
          type?: 'volunteer' | 'donation'
          category?: string
          location?: string
          is_remote?: boolean
          start_date?: string | null
          end_date?: string | null
          urgency?: 'low' | 'medium' | 'high' | 'critical'
          status?: 'active' | 'completed' | 'cancelled'
          required_skills?: string[] | null
          items?: string[] | null
          contact_email?: string
          contact_phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      interests: {
        Row: {
          id: string
          user_id: string
          opportunity_id: string
          message: string | null
          status: 'pending' | 'accepted' | 'declined'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          opportunity_id: string
          message?: string | null
          status?: 'pending' | 'accepted' | 'declined'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          opportunity_id?: string
          message?: string | null
          status?: 'pending' | 'accepted' | 'declined'
          created_at?: string
        }
      }
      saved_opportunities: {
        Row: {
          id: string
          user_id: string
          opportunity_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          opportunity_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          opportunity_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
