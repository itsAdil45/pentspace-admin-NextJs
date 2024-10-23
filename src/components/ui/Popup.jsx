// import React, { Children } from 'react';
// import * as DialogPrimitive from '@radix-ui/react-dialog';
// import { cn } from '@/lib/utils';


// const Dialog = DialogPrimitive.Root
// const DialogTrigger = DialogPrimitive.Trigger
// const DialogClose = DialogPrimitive.Close
// const DialogPortal = DialogPrimitive.Portal

// const DialogOverlay = ({className, ...props})=>{
//    return(
//     <DialogPrimitive.Overlay className={cn(
//         "bg-black-primary/80 data-[state=open]:animate-overlayShow fixed inset-0",
//         className
//     )} 
//     {...props}
//     />
//    ) 
// }

// DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

// const DialogContent = ({className, Children, ...props})=>{
//     <DialogPortal>
//         <DialogOverlay>
//         <DialogPrimitive.Content className={cn("data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none", className)}
//         {...props}
//         >
//             {Children}
//       </DialogPrimitive.Content>
//         </DialogOverlay>
//     </DialogPortal>
// }

// DialogContent.displayName = DialogPrimitive.Content.displayName


// export {
//     Dialog,
//     DialogTrigger,
//     DialogClose,
//     DialogContent,
//     DialogOverlay,
//     DialogPortal,
// }

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

const Popup = ({ children, open, setOpen, cross=false }) => (
  <Dialog.Root open={open} onOpenChange={(open) => setOpen(open)} className="z-50">
    <Dialog.Portal>
      <Dialog.Overlay  className="bg-black-primary/50 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="z-[50] data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[500px]  w-[300px] sm:w-[400px] md:w-[650px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        {children}
        {cross &&
        <Dialog.Close asChild className='border-0 peer'>
          <button
            className="text-red-primary  border-0 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center group"
            aria-label="Close"
          >
            <Cross2Icon className='group-hover:rotate-180 transition-all ease-in-out duration-300'/>
          </button>
        </Dialog.Close>
        }
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default Popup;
