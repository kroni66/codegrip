import { TextScramble } from "@/components/ui/text-scramble"

export default function TextScrambleTestPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center">TextScramble Test Page</h1>

        <div className="space-y-8">
          <div className="text-center p-8 border border-gray-700 rounded-lg">
            <TextScramble
              as="h2"
              className="text-3xl font-bold mb-4"
              duration={1.2}
              speed={0.03}
            >
              Hello World
            </TextScramble>
            <p className="text-gray-400">Basic scramble test</p>
          </div>

          <div className="text-center p-8 border border-gray-700 rounded-lg">
            <TextScramble
              as="h3"
              className="text-2xl font-semibold mb-4"
              duration={0.8}
              speed={0.05}
              characterSet="01"
            >
              Binary Code
            </TextScramble>
            <p className="text-gray-400">Binary character set</p>
          </div>

          <div className="text-center p-8 border border-gray-700 rounded-lg">
            <TextScramble
              as="p"
              className="text-xl mb-4"
              duration={2.0}
              speed={0.02}
            >
              This is a longer text that will scramble slowly
            </TextScramble>
            <p className="text-gray-400">Long text with slow animation</p>
          </div>
        </div>
      </div>
    </div>
  )
}
