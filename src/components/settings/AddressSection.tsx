import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Plus, Edit2, Trash } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Address {
  id: string;
  name: string;
  address: string;
  phone: string;
  isDefault: boolean;
}

const AddressSection = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    // Load saved addresses
    const saved = localStorage.getItem("addressPreferences");
    if (saved) {
      setAddresses(JSON.parse(saved));
    }
  }, []);

  const saveAddresses = (updated: Address[]) => {
    setAddresses(updated);
    localStorage.setItem("addressPreferences", JSON.stringify(updated));
  };

  const handleSaveAddress = () => {
    if (!formData.name || !formData.address || !formData.phone) {
      toast.error("Please fill all fields");
      return;
    }

    if (editingAddress) {
      // Update existing address
      const updated = addresses.map(addr =>
        addr.id === editingAddress.id
          ? { ...addr, ...formData }
          : addr
      );
      saveAddresses(updated);
      toast.success("Address updated successfully");
    } else {
      // Add new address
      const newAddress: Address = {
        id: Date.now().toString(),
        ...formData,
        isDefault: addresses.length === 0,
      };
      saveAddresses([...addresses, newAddress]);
      toast.success("Address added successfully");
    }

    setIsDialogOpen(false);
    setFormData({ name: "", address: "", phone: "" });
    setEditingAddress(null);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      name: address.name,
      address: address.address,
      phone: address.phone,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteAddress = (id: string) => {
    const updated = addresses.filter(addr => addr.id !== id);
    saveAddresses(updated);
    toast.success("Address deleted successfully");
  };

  const handleSetDefault = (id: string) => {
    const updated = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    }));
    saveAddresses(updated);
    toast.success("Default address updated");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delivery Addresses</CardTitle>
        <CardDescription>
          Manage your delivery addresses for faster checkout
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="border rounded-lg p-4 space-y-2 relative"
          >
            {address.isDefault && (
              <span className="absolute top-2 right-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                Default
              </span>
            )}
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-1 text-muted-foreground" />
              <div className="flex-1">
                <p className="font-medium">{address.name}</p>
                <p className="text-sm text-muted-foreground">{address.address}</p>
                <p className="text-sm text-muted-foreground">{address.phone}</p>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditAddress(address)}
              >
                <Edit2 className="w-3 h-3 mr-1" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteAddress(address.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash className="w-3 h-3 mr-1" />
                Delete
              </Button>
              {!address.isDefault && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSetDefault(address.id)}
                >
                  Set as Default
                </Button>
              )}
            </div>
          </div>
        ))}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full sm:w-auto gap-2"
              onClick={() => {
                setEditingAddress(null);
                setFormData({ name: "", address: "", phone: "" });
              }}
            >
              <Plus className="w-4 h-4" />
              Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingAddress ? "Edit Address" : "Add New Address"}
              </DialogTitle>
              <DialogDescription>
                Enter your delivery address details
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Home, Office"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  placeholder="Enter full address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveAddress}>
                {editingAddress ? "Update" : "Add"} Address
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default AddressSection;