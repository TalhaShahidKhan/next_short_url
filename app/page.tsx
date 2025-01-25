'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { FormEvent, useState } from "react"
import Link from "next/link";

export default function Home() {
  // State management
  const [formData, setFormData] = useState({
    url: '',
    alias: ''
  });
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  const clearForm = () => {
    setFormData({
      url: '',
      alias: '',
      // ... reset all form fields
    });
    setShortenedUrl(null)
  };

  // Form submission handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Add your API call here
      const response = await fetch('/api/shorten', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      // console.log(await response.status)
      // console.log(await response.json())
      if (!response.ok) {
        const data = await response.json();
        alert(`${data.Error}`)
        
      }
      else{
        const data = await response.json();
        setShortenedUrl(`${process.env.NEXT_PUBLIC_URL}/${data.result.alias}`);
      }
      
      
    } catch (error) {
      console.error('Error shortening URL:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const cardVariants = {
    hidden: { scale: 0.9, y: 20 },
    visible: { 
      scale: 1, 
      y: 0,
      transition: { delay: 0.1, type: "spring", stiffness: 100 }
    }
  };

  const formVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { delay: 0.3 }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex items-center justify-center bg-background p-4"
    >
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>URL Shortener</CardTitle>
            <CardDescription>
              Enter a long URL and custom alias to create a shorter link.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* URL Shortening Form */}
            <motion.form 
              className="space-y-4"
              variants={formVariants}
              onSubmit={handleSubmit}
            >
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  placeholder="Enter your long URL"
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    url: e.target.value
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alias">Custom Alias</Label>
                <Input
                  id="alias"
                  placeholder="Enter custom alias"
                  type="text"
                  value={formData.alias}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    alias: e.target.value
                  }))}
                />
              </div>
              <Button 
                className="w-full" 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Shortening...' : 'Shorten URL'}
              </Button>
            </motion.form>

            {/* Shortened URL Display */}
            {shortenedUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-secondary rounded-lg"
              >
                <Label className="block mb-2">Shortened URL:</Label>
                <div className="flex gap-2">
                  <Input 
                    readOnly 
                    value={shortenedUrl}
                    className="bg-background"
                  />
                  <Link href={shortenedUrl} target="_blank" onClick={clearForm}>
                    Open
                  </Link>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
