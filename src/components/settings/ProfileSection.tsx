import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, User, Mail, Save } from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface ProfileSectionProps {
  user: SupabaseUser | null;
  displayName: string;
  email: string;
  onDisplayNameChange: (name: string) => void;
}

const ProfileSection = ({ user, displayName, email, onDisplayNameChange }: ProfileSectionProps) => {
  const [saving, setSaving] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { display_name: displayName }
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your personal information and avatar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
              {displayName ? getInitials(displayName) : <User />}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium">{displayName || "User"}</p>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Display Name
            </Label>
            <Input
              id="displayName"
              type="text"
              placeholder="Enter your name"
              value={displayName}
              onChange={(e) => onDisplayNameChange(e.target.value)}
              disabled={saving}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">
              Email cannot be changed
            </p>
          </div>

          <Button
            onClick={handleSaveProfile}
            disabled={saving}
            className="w-full sm:w-auto"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;