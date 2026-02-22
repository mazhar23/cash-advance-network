import { Button } from "@/components/ui/button";
import { Smartphone, Apple, Play } from "lucide-react";

const DownloadAppSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Smartphone className="h-16 w-16 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Download Our App
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Get our mobile app for easy access to your account, quick applications, and instant notifications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="flex items-center gap-2">
              <Apple className="h-5 w-5" />
              Download for iOS
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Download for Android
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadAppSection;
