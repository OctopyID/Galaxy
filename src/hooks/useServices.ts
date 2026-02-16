import { useState, useEffect, useCallback } from "react";
import type { Service } from "@/data/services";

const API_URL = "http://localhost:1337/services";

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        setError("Failed to fetch services");
        return;
      }

      const data = await response.json();
      setServices(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching services:", err);
      setError("Failed to load services");
    } finally {
      setLoading(false);
    }
  }, []);

  const addService = async (newService: Omit<Service, "id">) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newService),
      });

      if (response.ok) {
        await fetchServices();
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error adding service:", err);
      return false;
    }
  };

  const deleteService = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchServices();
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error deleting service:", err);
      return false;
    }
  };

  const updateService = async (id: string, updatedService: Partial<Service>) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedService),
      });

      if (response.ok) {
        await fetchServices();
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error updating service:", err);
      return false;
    }
  };

  useEffect(() => {
    void fetchServices();
  }, [fetchServices]);

  return {
    services,
    loading,
    error,
    addService,
    updateService,
    deleteService,
    refreshServices: fetchServices,
  };
}
