"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { playerRegistration } from "../actions/players";
import { PlayerInput } from "../actions/players";

export default function PlayerRegistrationPage(seasonData: any) {
  //   console.log(seasonData);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    try {
      if (!acceptedTerms) {
        toast.error("Please accespt Terms & Conditions.");
        return;
      }
      setLoading(true);

      const formData = new FormData(form);
      // const data = Object.fromEntries(formData.entries());
      // console.log(data);

      const payload: PlayerInput = {
        name: formData.get("name") as string,
        fatherName: formData.get("fatherName") as string,
        phone: formData.get("phone") as string,
        role: formData.get("role") as string,
        age: formData.get("age") as string,
        address: formData.get("address") as string,
        panchayat: formData.get("panchayat") as string,
        seasonId: formData.get("seasonId") as string,

        battingStyle: (formData.get("battingStyle") as string) || undefined,
        bowlingStyle: (formData.get("bowlingStyle") as string) || undefined,
      };

      const response = await playerRegistration(payload);
      if (response?.success) {
        toast.success(response.message);
        form.reset();
        setPreview(null);
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-10 bg-linear-to-br from-zinc-100 to-zink-200 flex items-center justify-center md:px-4 md:py-10">
      <Card className="w-full max-w-3xl shadow-xl md:rounded-2xl bg-red-50">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-3xl font-bold">
            HPL Player Registration Form
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Register yourself for Hurlung Premier League
          </p>
          <p className="font-bold">
            HPL Season&nbsp;
            {seasonData.seasonData.seasonNumber}&nbsp;
            {seasonData.seasonData.year}
          </p>
        </CardHeader>

        <CardContent>
          {/* Avatar Upload */}
          <div className="flex flex-col items-center mb-8">
            <div
              onClick={() => fileRef.current?.click()}
              className="relative h-36 w-36 rounded-full overflow-hidden border-4 border-muted cursor-pointer hover:opacity-90 transition"
            >
              <Image
                src={preview || "/avtar-placeholder.png"}
                alt="Player Photo"
                fill
                className="object-cover"
              />
            </div>

            <p className="text-sm text-muted-foreground mt-2">
              Click to upload player photo
            </p>

            <Input
              ref={fileRef}
              type="file"
              name="photo"
              accept="image/*"
              required
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Width Fields */}
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                name="name"
                placeholder="Enter full name"
                required
                className="h-12 text-base"
              />
            </div>
            <div className="space-y-2">
              <Label>Father's Name</Label>
              <Input
                name="fatherName"
                placeholder="Enter father name"
                required
                className="h-12 text-base"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  name="phone"
                  placeholder="10-digit mobile number"
                  required
                  type="text"
                  maxLength={10}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label>Age</Label>
                <Input
                  name="age"
                  type="text"
                  maxLength={2}
                  required
                  className="h-12 text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4">
              {/* Player Role */}
              <div className="space-y-1.5 w-full">
                <Label>Player Role</Label>
                <Select name="role" required>
                  <SelectTrigger className="h-12 text-base w-full">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Batsman">Batsman</SelectItem>
                    <SelectItem value="Bowler">Bowler</SelectItem>
                    <SelectItem value="All Rounder">All-Rounder</SelectItem>
                    <SelectItem value="Wicket Keeper Batsman">
                      Wicket Keeper Batsman
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Batting Style */}
              <div className="space-y-1.5 w-full">
                <Label>Batting Style</Label>
                <Select name="battingStyle">
                  <SelectTrigger className="h-12 text-base w-full">
                    <SelectValue placeholder="Batting style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Right Hand">Right Hand</SelectItem>
                    <SelectItem value="Left Hand">Left Hand</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bowling Style */}
              <div className="space-y-1.5 w-full">
                <Label>Bowling Style</Label>
                <Select name="bowlingStyle">
                  <SelectTrigger className="h-12 text-base w-full">
                    <SelectValue placeholder="Bowling style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Right Arm Fast">
                      Right Arm Fast
                    </SelectItem>
                    <SelectItem value="Left Arm Fast">Left Arm Fast</SelectItem>
                    <SelectItem value="Off Spin">Off Spin</SelectItem>
                    <SelectItem value="Leg Spin">Leg Spin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Panchayat</Label>
              <Input
                name="panchayat"
                placeholder="Hurlung / Govindpur etc."
                required
                className="h-12 text-base"
              />
            </div>
            <div className="space-y-2">
              <input
                type="hidden"
                name="seasonId"
                value={seasonData.seasonData.id}
              />
            </div>

            <div className="space-y-2">
              <Label>Address</Label>
              <Textarea
                name="address"
                placeholder="Village / Panchayat"
                rows={4}
                required
                className="text-base"
              />
            </div>
            <div className="flex items-center gap-2 rounded-lg p-4">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={(value) => setAcceptedTerms(Boolean(value))}
              />
              <Label
                htmlFor="terms"
                className="text-sm leading-relaxed cursor-pointer"
              >
                I agree to the
                <a
                  href="/terms"
                  target="_blank"
                  className="underline font-medium hover:text-primary"
                >
                  Terms & Conditions
                </a>{" "}
              </Label>
            </div>

            <Button
              disabled={loading}
              className="w-full h-14 text-lg rounded-xl cursor-pointer"
            >
              {loading ? "Submitting..." : "Submit Registration"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
