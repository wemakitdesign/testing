
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, PlusSquare, ArrowRight } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border border-dashed hover:border-wemakit-purple/50 transition-colors">
        <CardContent className="p-6 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="rounded-full bg-wemakit-purple/10 p-4 text-wemakit-purple">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-medium text-xl mb-2">No active requests</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                You don't have any active design requests at the moment. Create your first request to start working with our designers.
              </p>
              <Button asChild variant="default" className="group bg-wemakit-purple hover:bg-wemakit-purple/90">
                <Link
                  to="/dashboard/requests/new"
                  className="text-sm inline-flex items-center gap-2"
                >
                  <PlusSquare className="h-4 w-4" />
                  Create your first request
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EmptyState;
