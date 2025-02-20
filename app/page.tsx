"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import SidebarPanel from "@/components/web/sidebar-panel";
import EditorPanel from "@/components/web/editor-panel";
import { EquationsProvider } from "@/context/equations-context";
import Header from "@/components/web/header";
import { IdentifiersProvider } from "@/context/identifiers-context";

export default function Home() {
  return (
    <EquationsProvider>
      <IdentifiersProvider>
        <div className="font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col h-screen">
            <Header />
            <ResizablePanelGroup direction="horizontal" className="flex-1">
              <ResizablePanel defaultSize={70}>
                <EditorPanel />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={30} className="hidden md:block">
                <SidebarPanel />
              </ResizablePanel>
            </ResizablePanelGroup>
          </main>
        </div>
      </IdentifiersProvider>
    </EquationsProvider>
  );
}
