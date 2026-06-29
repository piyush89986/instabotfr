import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createPost } from '../services/publishing.service';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Calendar, Image as ImageIcon, Video, Send } from 'lucide-react';

export default function Publishing() {
  const [postType, setPostType] = useState<'IMAGE' | 'REEL' | 'STORY'>('IMAGE');
  const [mediaUrl, setMediaUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  
  // Hardcoded for demo, normally fetched from user state
  const dummyAccountId = '6a3e546c98b36780f8a893bc';

  const publishMutation = useMutation({
    mutationFn: () => createPost({
      instagramAccountId: dummyAccountId,
      postType,
      mediaUrls: [mediaUrl],
      caption,
      scheduledTime: scheduledTime ? new Date(scheduledTime).toISOString() : undefined,
      publishNow: !scheduledTime
    }),
    onSuccess: () => {
      alert(scheduledTime ? 'Post Scheduled!' : 'Post published (queued)!');
      setMediaUrl('');
      setCaption('');
      setScheduledTime('');
    },
    onError: (err: any) => {
      alert(`Error: ${err.message}`);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaUrl) return alert('Media URL is required');
    publishMutation.mutate();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Content Publishing</h1>
        <p className="text-muted-foreground mt-2">Schedule your Posts, Reels, and Stories to auto-publish to Instagram.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Composer */}
        <div className="md:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2"><Send size={20}/> Create Post</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-4 mb-4">
              <Button 
                type="button"
                variant={postType === 'IMAGE' ? 'default' : 'outline'}
                onClick={() => setPostType('IMAGE')}
                className="flex-1 gap-2"
              ><ImageIcon size={16}/> Post</Button>
              <Button 
                type="button"
                variant={postType === 'REEL' ? 'default' : 'outline'}
                onClick={() => setPostType('REEL')}
                className="flex-1 gap-2"
              ><Video size={16}/> Reel</Button>
              <Button 
                type="button"
                variant={postType === 'STORY' ? 'default' : 'outline'}
                onClick={() => setPostType('STORY')}
                className="flex-1 gap-2"
              ><Calendar size={16}/> Story</Button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Media URL</label>
              <Input 
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>

            {postType !== 'STORY' && (
              <div>
                <label className="block text-sm font-medium mb-2">Caption</label>
                <textarea 
                  className="w-full bg-background border border-border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[120px]"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Write a caption..."
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Schedule Time (Leave blank to publish now)</label>
              <Input 
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={publishMutation.isPending}
            >
              {publishMutation.isPending ? 'Processing...' : (scheduledTime ? 'Schedule Post' : 'Publish Now')}
            </Button>
          </form>
        </div>

        {/* Preview */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-6 w-full">Preview</h2>
          <div className="w-full max-w-[280px] bg-background border border-border rounded-3xl overflow-hidden shadow-sm aspect-[9/16] relative">
            {mediaUrl ? (
              <img src={mediaUrl} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted/20">
                No Media
              </div>
            )}
            {postType !== 'STORY' && caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
                <p className="text-white text-sm line-clamp-3">{caption}</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
