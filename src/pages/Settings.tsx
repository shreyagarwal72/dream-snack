import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfileSection from "@/components/settings/ProfileSection";
import ThemeSection from "@/components/settings/ThemeSection";
import NotificationSection from "@/components/settings/NotificationSection";
import PrivacySection from "@/components/settings/PrivacySection";
import AddressSection from "@/components/settings/AddressSection";
import AccountSection from "@/components/settings/AccountSection";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const Settings = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      setUser(session.user);
      setEmail(session.user.email || "");
      setDisplayName(session.user.user_metadata?.display_name || "");
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        setEmail(session.user.email || "");
        setDisplayName(session.user.user_metadata?.display_name || "");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Account Settings - Dream Snack | Manage Your Profile</title>
        <meta name="description" content="Manage your Dream Snack account settings, delivery addresses, payment methods, and preferences. Update profile information and customize your food delivery experience." />
        <meta name="keywords" content="account settings, profile management, delivery address, payment methods, user preferences, account management" />
        <link rel="canonical" href="https://dreamsnack.com/settings" />
        <meta property="og:title" content="Account Settings - Dream Snack" />
        <meta property="og:description" content="Manage your Dream Snack account settings and preferences" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl flex-1">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="gap-2 hover:bg-accent">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your account settings and preferences
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 gap-1 h-auto">
              <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Profile
              </TabsTrigger>
              <TabsTrigger value="theme" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Theme
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Privacy
              </TabsTrigger>
              <TabsTrigger value="addresses" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Addresses
              </TabsTrigger>
              <TabsTrigger value="account" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Account
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <ProfileSection
                user={user}
                displayName={displayName}
                email={email}
                onDisplayNameChange={setDisplayName}
              />
            </TabsContent>

            <TabsContent value="theme" className="space-y-6">
              <ThemeSection />
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <NotificationSection />
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <PrivacySection />
            </TabsContent>

            <TabsContent value="addresses" className="space-y-6">
              <AddressSection />
            </TabsContent>

            <TabsContent value="account" className="space-y-6">
              <AccountSection />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Settings;
