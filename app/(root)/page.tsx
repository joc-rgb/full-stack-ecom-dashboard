"use client";

import {Modal} from "@/components/ui/modal";

export default function Home() {
    return (
      <div className="p-4">
        <Modal title="test" description="this is for testing purpose" isOpen onClose={()=>{}}>
          Children
        </Modal>
        
      </div>
    );
  }
  