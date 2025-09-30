import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Monitor, Moon, Sun, Globe } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const ThemeSection = () => {
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    // Load saved preferences
    const savedTheme = localStorage.getItem("theme") || "system";
    const savedLanguage = localStorage.getItem("language") || "en";
    setTheme(savedTheme);
    setLanguage(savedLanguage);
    
    // Apply theme
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (selectedTheme: string) => {
    const root = document.documentElement;
    if (selectedTheme === "dark") {
      root.classList.add("dark");
    } else if (selectedTheme === "light") {
      root.classList.remove("dark");
    } else {
      // System preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  };

  const handleThemeChange = (value: string) => {
    setTheme(value);
    localStorage.setItem("theme", value);
    applyTheme(value);
    toast.success("Theme updated successfully");
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    localStorage.setItem("language", value);
    toast.success("Language preference saved");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance & Language</CardTitle>
        <CardDescription>
          Customize how Dream Snack looks and your language preference
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Theme</Label>
          <RadioGroup value={theme} onValueChange={handleThemeChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light" className="flex items-center gap-2 cursor-pointer">
                <Sun className="w-4 h-4" />
                Light
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dark" id="dark" />
              <Label htmlFor="dark" className="flex items-center gap-2 cursor-pointer">
                <Moon className="w-4 h-4" />
                Dark
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="system" id="system" />
              <Label htmlFor="system" className="flex items-center gap-2 cursor-pointer">
                <Monitor className="w-4 h-4" />
                System
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="language" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Language
          </Label>
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger id="language" className="bg-background">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent className="bg-background border border-border z-50">
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
              <SelectItem value="es">Español (Spanish)</SelectItem>
              <SelectItem value="fr">Français (French)</SelectItem>
              <SelectItem value="de">Deutsch (German)</SelectItem>
              <SelectItem value="zh">中文 (Chinese)</SelectItem>
              <SelectItem value="ja">日本語 (Japanese)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Language preference will be saved for future visits
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeSection;