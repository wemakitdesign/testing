import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

const DesignerManagement = () => {
  const [designers, setDesigners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDesigners = async () => {
      setLoading(true);
      const { data: designersData } = await supabase.from('designers').select('*');
      setDesigners(designersData || []);
      setLoading(false);
    };
    fetchDesigners();
  }, []);

  return (
    <div>
      {/* Render your component content here */}
    </div>
  );
};

export default DesignerManagement; 