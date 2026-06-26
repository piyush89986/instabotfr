import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios';
import { Button } from '../components/ui/Button';

// Fetch already connected accounts
const fetchConnectedAccounts = async () => {
  const { data } = await api.get('/instagram/accounts');
  return data.data?.accounts || [];
};

// Connect Instagram via Facebook Login
const connectInstagram = async (accessToken: string) => {
  const { data } = await api.post('/instagram/oauth/callback', { accessToken });
  return data;
};

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: any;
  }
}

export default function Settings() {
  const [fbLoaded, setFbLoaded] = useState(false);
  const [status, setStatus] = useState('');
  const queryClient = useQueryClient();

  const { data: accounts = [], isLoading } = useQuery<any[]>({
    queryKey: ['instagram-accounts'],
    queryFn: fetchConnectedAccounts,
  });

  const connectMutation = useMutation({
    mutationFn: connectInstagram,
    onSuccess: (data) => {
      const savedAccounts = data.data?.accounts || [];
      if (savedAccounts.length > 0) {
        setStatus('✅ Instagram account connected successfully!');
      } else {
        setStatus('⚠️ Facebook connected, but no Instagram Business accounts were found!');
      }
      queryClient.invalidateQueries({ queryKey: ['instagram-accounts'] });
    },
    onError: (err: any) => {
      setStatus('❌ Failed to connect: ' + (err.response?.data?.message || err.message));
    },
  });

  // Load Facebook SDK dynamically
  const loadFacebookSDK = () => {
    if (window.FB) {
      launchFacebookLogin();
      return;
    }

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: import.meta.env.VITE_META_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v19.0',
      });
      setFbLoaded(true);
      launchFacebookLogin();
    };

    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  };

  const launchFacebookLogin = () => {
    window.FB.login(
      (response: any) => {
        if (response.authResponse?.accessToken) {
          setStatus('⏳ Connecting your Instagram account...');
          connectMutation.mutate(response.authResponse.accessToken);
        } else {
          setStatus('❌ Facebook login was cancelled or failed.');
        }
      },
      {
        scope:
          'instagram_basic,instagram_manage_messages,instagram_manage_comments,pages_messaging,pages_read_engagement,pages_show_list,business_management',
      }
    );
  };

  return (
    <div className="animate-fade-in space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your connected Instagram accounts and workspace settings.
        </p>
      </div>

      {/* Connect Instagram Card */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Connect Instagram Account
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Connect your Instagram Business or Creator account to enable AI automation.
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
            IG
          </div>
        </div>

        <Button
          onClick={loadFacebookSDK}
          disabled={connectMutation.isPending}
          className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {connectMutation.isPending ? 'Connecting...' : '🔗 Connect with Facebook'}
        </Button>

        {status && (
          <p className={`mt-3 text-sm ${status.startsWith('✅') ? 'text-green-400' : status.startsWith('⏳') ? 'text-amber-400' : 'text-destructive'}`}>
            {status}
          </p>
        )}
      </div>

      {/* Connected Accounts */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Connected Accounts
        </h2>

        {isLoading ? (
          <p className="text-muted-foreground text-sm">Loading accounts...</p>
        ) : accounts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-4xl mb-3">📷</p>
            {status.includes('⚠️') && (
              <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 p-4 rounded-lg text-sm mb-6 max-w-md mx-auto text-left">
                <p className="font-bold mb-2">How to fix this issue:</p>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>Open Instagram on your phone.</li>
                  <li>Go to Settings &rarr; Account Type &rarr; <strong>Switch to Professional Account</strong>.</li>
                  <li>Go to Edit Profile &rarr; Page, and <strong>connect it to your Facebook Page</strong>.</li>
                  <li>Click "Connect with Facebook" above again!</li>
                </ol>
              </div>
            )}
            <p>No Instagram accounts connected yet.</p>
            <p className="text-sm mt-1">Click the button above to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {accounts.map((acc: any) => (
              <div
                key={acc._id}
                className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border"
              >
                {acc.profilePicUrl ? (
                  <img
                    src={acc.profilePicUrl}
                    alt={acc.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    {acc.username?.[0]?.toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-medium text-foreground">@{acc.username}</p>
                  <p className="text-xs text-muted-foreground">ID: {acc.instagramAccountId}</p>
                </div>
                <span className="ml-auto text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                  ● Active
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
