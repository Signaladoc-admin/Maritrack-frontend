"use client";

import { Button } from "@/shared/ui/button";
import { InputGroup } from "@/shared/ui/input-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";

export default function BusinessRegistrationForm() {
  return (
    <form className="space-y-7">
      <InputGroup label="Business name" type="text" placeholder="Business name here" />
      <InputGroup label="Business email" type="email" placeholder="Email here" />
      <InputGroup
        label="Business address"
        type="text"
        placeholder="Enter street address, apt, number, etc"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <InputGroup label="Country" type="select">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ng">Lagos</SelectItem>
              <SelectItem value="gh">Ghana</SelectItem>
              <SelectItem value="ke">Kenya</SelectItem>
              <SelectItem value="za">South Africa</SelectItem>
            </SelectContent>
          </Select>
        </InputGroup>
        <InputGroup label="Country" type="select">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ng">Nigeria</SelectItem>
              <SelectItem value="gh">Ghana</SelectItem>
              <SelectItem value="ke">Kenya</SelectItem>
              <SelectItem value="za">South Africa</SelectItem>
            </SelectContent>
          </Select>
        </InputGroup>
      </div>

      <Button className="w-full">Next</Button>
    </form>
  );
}
