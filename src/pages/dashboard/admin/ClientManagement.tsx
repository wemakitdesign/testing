import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

const ClientManagement = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      const { data: clientsData } = await supabase.from('clients').select('*');
      setClients(clientsData || []);
      setLoading(false);
    };
    fetchClients();
  }, []);

  return (
    <div>
      {/* Render your component content here */}
    </div>
  );
};

export default ClientManagement; 