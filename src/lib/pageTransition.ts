import { onNavigate } from "$app/navigation";

// place files you want to import through the `$lib` alias in this folder.
export const preparePageTransition = ()=>{
    onNavigate((navigation) => {
        if (!document.startViewTransition) return;
        return new Promise((resolve) => {
            document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
            });
        });
    });
}



