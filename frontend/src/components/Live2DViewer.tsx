"use client";
import { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';

// Dynamically import Live2DModel to avoid SSR issues
const loadLive2D = async () => {
    const { Live2DModel } = await import('pixi-live2d-display');
    (window as any).PIXI = PIXI; // Make PIXI global for the plugin
    Live2DModel.registerTicker(PIXI.Ticker);
    return Live2DModel;
};

interface Live2DViewerProps {
    modelPath: string;
    expression?: string;
    motion?: string;
    speaking?: boolean;
}

export default function Live2DViewer({ modelPath, expression, speaking }: Live2DViewerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [app, setApp] = useState<PIXI.Application | null>(null);
    const [model, setModel] = useState<any>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const init = async () => {
            const Live2DModel = await loadLive2D();

            const pixiApp = new PIXI.Application({
                view: canvasRef.current,
                autoStart: true,
                backgroundAlpha: 0,
                resizeTo: canvasRef.current.parentElement as HTMLElement,
            });
            setApp(pixiApp);

            try {
                const loadedModel = await Live2DModel.from(modelPath);
                loadedModel.x = pixiApp.screen.width / 2;
                loadedModel.y = pixiApp.screen.height / 2 + 100; // Offset
                loadedModel.anchor.set(0.5, 0.5);
                loadedModel.scale.set(0.3); // Initial scale, adjust as needed

                pixiApp.stage.addChild(loadedModel);
                setModel(loadedModel);
            } catch (e) {
                console.error("Failed to load Live2D model:", e);
            }
        };

        init();

        return () => {
            app?.destroy(true, { children: true });
        };
    }, []);

    useEffect(() => {
        if (!model) return;
        // Simple lip sync simulation
        if (speaking) {
            // In a real app, bind this to audio amplitude
            // model.internalModel.coreModel.setParamFloat("PARAM_MOUTH_OPEN_Y", 1.0);
        }
    }, [speaking, model]);

    return (
        <div className="w-full h-full relative">
            <canvas ref={canvasRef} className="w-full h-full" />
            {!model && (
                <div className="absolute inset-0 flex items-center justify-center text-white/50">
                    Loading Model...
                </div>
            )}
        </div>
    );
}
