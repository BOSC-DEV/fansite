
import { supabase } from "@/integrations/supabase/client";
import { storageService } from "@/services/storage";
import { toast } from "sonner";

export interface ProfileData {
  id: string;
  displayName: string;
  username: string;
  profilePicUrl: string;
  walletAddress: string;
  createdAt: string;
  xLink: string;
  websiteLink: string;
  bio: string;
  points?: number; // Add points as optional
}

export class ProfileDataProcessor {
  async updateExistingProfile(profileId: string, profileData: Omit<ProfileData, 'id' | 'walletAddress' | 'createdAt'>): Promise<boolean> {
    console.log("[ProfileDataProcessor] Updating existing profile with ID:", profileId);
    
    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          display_name: profileData.displayName,
          username: profileData.username,
          profile_pic_url: profileData.profilePicUrl || '',
          x_link: profileData.xLink || '',
          website_link: profileData.websiteLink || '',
          bio: profileData.bio || ''
        })
        .eq('id', profileId);
      
      if (updateError) {
        console.error("[ProfileDataProcessor] Error updating profile:", updateError);
        throw new Error(updateError.message);
      }
      
      console.log("[ProfileDataProcessor] Profile updated successfully");
      return true;
    } catch (error) {
      console.error("[ProfileDataProcessor] Error in updateExistingProfile:", error);
      throw error;
    }
  }

  async createNewProfile(profileData: ProfileData): Promise<boolean> {
    console.log("[ProfileDataProcessor] Creating new profile with ID:", profileData.id);
    
    try {
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: profileData.id,
          display_name: profileData.displayName,
          username: profileData.username,
          profile_pic_url: profileData.profilePicUrl || '',
          wallet_address: profileData.walletAddress,
          created_at: profileData.createdAt,
          x_link: profileData.xLink || '',
          website_link: profileData.websiteLink || '',
          bio: profileData.bio || '',
          points: profileData.points || 0
        });
      
      if (insertError) {
        console.error("[ProfileDataProcessor] Error creating profile:", insertError);
        throw new Error(insertError.message);
      }
      
      console.log("[ProfileDataProcessor] Profile created successfully");
      return true;
    } catch (error) {
      console.error("[ProfileDataProcessor] Error in createNewProfile:", error);
      throw error;
    }
  }

  async saveProfileWithFallback(profileData: ProfileData, hasProfile: boolean, profileId?: string): Promise<boolean> {
    try {
      if (hasProfile && profileId) {
        // Update existing profile
        return await this.updateExistingProfile(profileId, {
          displayName: profileData.displayName,
          username: profileData.username,
          profilePicUrl: profileData.profilePicUrl,
          xLink: profileData.xLink,
          websiteLink: profileData.websiteLink,
          bio: profileData.bio,
          points: profileData.points
        });
      } else {
        // Create new profile
        return await this.createNewProfile(profileData);
      }
    } catch (directError) {
      console.error("[ProfileDataProcessor] Direct operations failed:", directError);
      
      // Use storage service as fallback
      console.log("[ProfileDataProcessor] Trying storage service as final fallback");
      
      // Add points if not provided
      if (profileData.points === undefined) {
        profileData.points = 0;
      }
      
      const success = await storageService.saveProfile(profileData as any);
      
      if (success) {
        console.log("[ProfileDataProcessor] Profile saved successfully via storage service");
        return true;
      } else {
        console.error("[ProfileDataProcessor] All save methods failed");
        throw new Error("All profile save methods failed");
      }
    }
  }
}

export const profileDataProcessor = new ProfileDataProcessor();
