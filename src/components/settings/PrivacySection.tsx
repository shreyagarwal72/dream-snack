import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Shield, Eye, Download, Trash2, Mail, Package, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const PrivacySection = () => {
  const [privacy, setPrivacy] = useState({
    shareData: false,
    analytics: true,
    marketing: false,
    orderHistory: true,
  });

  useEffect(() => {
    // Load saved preferences
    const saved = localStorage.getItem("privacyPreferences");
    if (saved) {
      setPrivacy(JSON.parse(saved));
    }
  }, []);

  const handleToggle = (key: keyof typeof privacy) => {
    const updated = { ...privacy, [key]: !privacy[key] };
    setPrivacy(updated);
    localStorage.setItem("privacyPreferences", JSON.stringify(updated));
    toast.success("Privacy settings updated");
  };

  const handleDownloadData = () => {
    // Simulate data download
    const userData = {
      exportDate: new Date().toISOString(),
      preferences: {
        notifications: localStorage.getItem("notificationPreferences"),
        privacy: localStorage.getItem("privacyPreferences"),
        theme: localStorage.getItem("theme"),
        language: localStorage.getItem("language"),
      },
    };
    
    const blob = new Blob([JSON.stringify(userData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dream-snack-data-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Your data has been downloaded");
  };

  const handleClearData = () => {
    localStorage.removeItem("notificationPreferences");
    localStorage.removeItem("privacyPreferences");
    localStorage.removeItem("addressPreferences");
    toast.success("Local data cleared successfully");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy & Security</CardTitle>
        <CardDescription>
          Manage your privacy settings and data preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="shareData" className="flex items-center gap-2 cursor-pointer">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="font-medium">Share usage data</div>
                <div className="text-xs text-muted-foreground">
                  Help improve our services by sharing anonymous usage data
                </div>
              </div>
            </Label>
            <Switch
              id="shareData"
              checked={privacy.shareData}
              onCheckedChange={() => handleToggle("shareData")}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="analytics" className="flex items-center gap-2 cursor-pointer">
              <Eye className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="font-medium">Analytics cookies</div>
                <div className="text-xs text-muted-foreground">
                  Allow cookies for better experience
                </div>
              </div>
            </Label>
            <Switch
              id="analytics"
              checked={privacy.analytics}
              onCheckedChange={() => handleToggle("analytics")}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="marketing" className="flex items-center gap-2 cursor-pointer">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="font-medium">Marketing communications</div>
                <div className="text-xs text-muted-foreground">
                  Receive personalized offers and recommendations
                </div>
              </div>
            </Label>
            <Switch
              id="marketing"
              checked={privacy.marketing}
              onCheckedChange={() => handleToggle("marketing")}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="orderHistory" className="flex items-center gap-2 cursor-pointer">
              <Package className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="font-medium">Save order history</div>
                <div className="text-xs text-muted-foreground">
                  Keep track of your past orders for easy reordering
                </div>
              </div>
            </Label>
            <Switch
              id="orderHistory"
              checked={privacy.orderHistory}
              onCheckedChange={() => handleToggle("orderHistory")}
            />
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <Button
            variant="outline"
            className="w-full sm:w-auto gap-2"
            onClick={handleDownloadData}
          >
            <Download className="w-4 h-4" />
            Download My Data
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-auto gap-2 text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
                Clear Local Data
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear local data?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will clear all your saved preferences stored locally on this device. 
                  Your account and order history will not be affected.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearData}>Clear Data</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivacySection;