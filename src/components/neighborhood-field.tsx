"use client";

import { useMemo, useState, type KeyboardEvent } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  filterNeighborhoodSuggestions,
  neighborhoodFromInput,
  neighborhoodInputValue,
  type NeighborhoodChoice,
} from "@/domain/neighborhoods";
import type { Neighborhood, NeighborhoodId } from "@/domain/types";
import { cn } from "@/lib/utils";

const LIST_ID = "neighborhood-suggestions";

type NeighborhoodFieldProps = {
  neighborhoodId: NeighborhoodId;
  neighborhoodOther?: string;
  onChange: (choice: NeighborhoodChoice) => void;
};

export function NeighborhoodField({
  neighborhoodId,
  neighborhoodOther,
  onChange,
}: NeighborhoodFieldProps) {
  const [query, setQuery] = useState(() =>
    neighborhoodInputValue({ neighborhoodId, neighborhoodOther }),
  );
  const [focused, setFocused] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const suggestions = useMemo(() => filterNeighborhoodSuggestions(query), [query]);
  const open = focused && !dismissed && suggestions.length > 0;
  const highlighted = open && activeIndex >= 0 ? activeIndex : -1;

  function commit(text: string, choice: NeighborhoodChoice = neighborhoodFromInput(text)) {
    setQuery(text);
    onChange(choice);
  }

  function select(neighborhood: Neighborhood) {
    setDismissed(true);
    setActiveIndex(-1);
    commit(neighborhood.name, { neighborhoodId: neighborhood.id });
  }

  function onQueryChange(text: string) {
    setDismissed(false);
    setActiveIndex(-1);
    commit(text);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" && suggestions.length > 0) {
      event.preventDefault();
      setDismissed(false);
      setActiveIndex((current) => {
        const start = current < 0 ? -1 : current;
        return Math.min(start + 1, suggestions.length - 1);
      });
      return;
    }
    if (event.key === "ArrowUp" && suggestions.length > 0) {
      event.preventDefault();
      setDismissed(false);
      setActiveIndex((current) => Math.max(current - 1, 0));
      return;
    }
    if (event.key === "Escape") {
      setDismissed(true);
      setActiveIndex(-1);
      return;
    }
    if (event.key === "Enter" && open && highlighted >= 0) {
      event.preventDefault();
      const neighborhood = suggestions[highlighted];
      if (neighborhood) select(neighborhood);
    }
  }

  return (
    <div className="grid gap-2">
      <Label htmlFor="neighborhood">Neighborhood</Label>
      <div className="relative">
        <Input
          id="neighborhood"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={LIST_ID}
          aria-activedescendant={
            highlighted >= 0 ? `${LIST_ID}-${highlighted}` : undefined
          }
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            const choice = neighborhoodFromInput(query);
            const canonical =
              choice.neighborhoodId === "other"
                ? (choice.neighborhoodOther ?? "")
                : neighborhoodInputValue(choice);
            if (canonical !== query) setQuery(canonical);
          }}
          onKeyDown={onKeyDown}
          placeholder="Chelsea, Greenpoint, …"
          autoComplete="off"
          className="h-11 text-base"
        />
        {open ? (
          <ul
            id={LIST_ID}
            role="listbox"
            className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-border bg-card py-1 shadow-sm"
          >
            {suggestions.map((neighborhood, index) => {
              const active = index === highlighted;
              return (
                <li key={neighborhood.id} role="presentation">
                  <button
                    id={`${LIST_ID}-${index}`}
                    type="button"
                    role="option"
                    aria-selected={active}
                    className={cn(
                      "w-full px-3 py-2 text-left",
                      active
                        ? "bg-primary/8 text-foreground"
                        : "hover:bg-primary/8",
                    )}
                    onMouseDown={(event) => event.preventDefault()}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => select(neighborhood)}
                  >
                    <div className="text-sm font-medium">{neighborhood.name}</div>
                    <p className="text-xs text-muted-foreground">{neighborhood.borough}</p>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
