import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Mail, MessageSquare, Package, Clock, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const NotificationSection = () => {
  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailPromotions: false,
    pushOrders: true,
    pushDelivery: true,
    smsOrders: false,
    smsDelivery: false,
  });

  useEffect(() => {
    // Load saved preferences
    const saved = localStorage.getItem("notificationPreferences");
    if (saved) {
      setNotifications(JSON.parse(saved));
    }
  }, []);

  const handleToggle = (key: keyof typeof notifications) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);
    localStorage.setItem("notificationPreferences", JSON.stringify(updated));
    toast.success("Notification preferences updated");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Choose how you want to receive updates about your orders
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="text-sm font-medium flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Notifications
          </div>
          <div className="space-y-3 ml-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="emailOrders" className="flex items-center gap-2 cursor-pointer">
                <Package className="w-4 h-4 text-muted-foreground" />
                Order confirmations
              </Label>
              <Switch
                id="emailOrders"
                checked={notifications.emailOrders}
                onCheckedChange={() => handleToggle("emailOrders")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="emailPromotions" className="flex items-center gap-2 cursor-pointer">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                Promotional offers
              </Label>
              <Switch
                id="emailPromotions"
                checked={notifications.emailPromotions}
                onCheckedChange={() => handleToggle("emailPromotions")}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-sm font-medium flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Push Notifications
          </div>
          <div className="space-y-3 ml-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="pushOrders" className="flex items-center gap-2 cursor-pointer">
                <Package className="w-4 h-4 text-muted-foreground" />
                Order updates
              </Label>
              <Switch
                id="pushOrders"
                checked={notifications.pushOrders}
                onCheckedChange={() => handleToggle("pushOrders")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="pushDelivery" className="flex items-center gap-2 cursor-pointer">
                <Clock className="w-4 h-4 text-muted-foreground" />
                Delivery status
              </Label>
              <Switch
                id="pushDelivery"
                checked={notifications.pushDelivery}
                onCheckedChange={() => handleToggle("pushDelivery")}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-sm font-medium flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            SMS Notifications
          </div>
          <div className="space-y-3 ml-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="smsOrders" className="flex items-center gap-2 cursor-pointer">
                <Package className="w-4 h-4 text-muted-foreground" />
                Order confirmations
              </Label>
              <Switch
                id="smsOrders"
                checked={notifications.smsOrders}
                onCheckedChange={() => handleToggle("smsOrders")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="smsDelivery" className="flex items-center gap-2 cursor-pointer">
                <Clock className="w-4 h-4 text-muted-foreground" />
                Delivery updates
              </Label>
              <Switch
                id="smsDelivery"
                checked={notifications.smsDelivery}
                onCheckedChange={() => handleToggle("smsDelivery")}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSection;