"use client"

import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "@ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import qs from "query-string";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");
  const name = searchParams.get("name");

  const [value, setValue] = useState<string>(name || "");
  const debouncedValue = useDebounce<string>(value, 500);

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const query = {
      name: debouncedValue,
      categoryId,
    };
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedValue, router, categoryId]);

  return (
    <div className="relative">
      <Search className="absolute w-4 h-4 top-3 left-4 text-muted-foreground" />
      <Input onChange={onChangeHandler} value={value} className="pl-10 bg-primary/10" placeholder="Search..." />
    </div>
  );
};

export default SearchInput;
