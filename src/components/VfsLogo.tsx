
import React from 'react';

const VfsLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-12 h-12 rounded-full border-2 border-vfs-blue flex items-center justify-center">
        <span className="text-vfs-blue font-serif italic text-xl font-semibold">vfs</span>
      </div>
      <span className="text-vfs-blue font-semibold text-xl uppercase">VFS.GLOBAL</span>
    </div>
  );
};

export default VfsLogo;
