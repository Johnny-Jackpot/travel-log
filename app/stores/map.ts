import type { MapPoint } from "~/types";

export const useMapStore = defineStore("useMapStore", () => {
  const mapPoints = ref<MapPoint[]>([]);

  return {
    mapPoints,
  };
});
