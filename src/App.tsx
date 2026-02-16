import {useEffect, useState} from "react";
import {ThemeProvider} from "@/components/ui/theme-provider";
import {ModeToggle} from "@/components/ui/mode-toggle";
import {ServiceCard} from "@/components/ServiceCard";
import {ServiceForm} from "@/components/ServiceForm";
import {SearchBar} from "@/components/SearchBar";
import {useServices} from "@/hooks/useServices";

function App() {
    const {services, loading, addService, updateService, deleteService} = useServices();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentTime, setCurrentTime] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    // Clock effect
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleString("en-US"));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const categories = [
        "All",
        ...new Set(services.map((s) => s.category || "Uncategorized")),
    ].sort();

    const filteredServices = services.filter((service) => {
        const matchesSearch =
            service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (service.description &&
                service.description.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory =
            selectedCategory === "All" ||
            (service.category || "Uncategorized") === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <div
                className="min-h-screen bg-gray-100 p-4 font-sans text-slate-800 transition-colors duration-300 sm:p-6 md:p-10 dark:bg-slate-900 dark:text-slate-200 flex flex-col">
                <div className="mx-auto max-w-7xl w-full flex-1">
                    {/* Header */}
                    <header
                        className="mb-8 flex flex-row items-center justify-between gap-4 border-b border-gray-300 pb-5 md:mb-10 dark:border-slate-700">
                        <div>
                            <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-800 dark:text-white">
                                <img src="/galaxy.png" alt="Galaxy Icon" className="h-8 w-8"/>
                                Galaxy
                            </h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Your Personal Dashboard
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div
                                id="clock"
                                className="hidden font-mono text-sm text-slate-500 md:block dark:text-slate-400"
                            >
                                {currentTime}
                            </div>
                            <ModeToggle/>
                        </div>
                    </header>

                    {/* Controls (Search & Add) */}
                    <div className="mb-6 flex flex-row items-center gap-2 sm:gap-4">
                        <div className="flex-1">
                            <SearchBar value={searchQuery} onChange={setSearchQuery}/>
                        </div>
                        <ServiceForm onSubmit={addService}/>
                    </div>

                    {/* Category Filter */}
                    <div className="scrollbar-none mb-8 flex gap-2 overflow-x-auto pb-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-all ${
                                    selectedCategory === cat
                                        ? "bg-slate-800 text-white dark:bg-white dark:text-slate-900"
                                        : "bg-white text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    {loading ? (
                        <div className="animate-pulse py-20 text-center text-slate-500">
                            Loading services...
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {filteredServices.map((service) => (
                                <ServiceCard
                                    key={service.id}
                                    service={service}
                                    onDelete={() => deleteService(service.id)}
                                    onEdit={(data) => updateService(service.id, data)}
                                />
                            ))}
                        </div>
                    )}

                    {!loading && filteredServices.length === 0 && (
                        <div className="py-20 text-center text-slate-500">
                            No services found.
                        </div>
                    )}
                </div>

                {/* Footer */}
                <footer className="mt-12 text-center text-sm text-slate-500 rm dark:text-slate-400">
                    <p>
                        &copy; {new Date().getFullYear()} Galaxy by <span className="font-bold">Octopy ID</span> - All Rights Reserved.
                    </p>
                    <p className="mt-2 text-xs">
                        Icons created by {" "}
                        <a href="https://www.flaticon.com/free-icons/universe" title="universe icons" target="_blank"
                           rel="noopener noreferrer"
                           className="underline hover:text-slate-800 dark:hover:text-slate-200">Freepik - Flaticon
                        </a>
                    </p>
                </footer>
            </div>
        </ThemeProvider>
    );
}

export default App;
