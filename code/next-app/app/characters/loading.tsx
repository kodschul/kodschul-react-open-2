export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4" />
        <p className="text-gray-600 text-lg font-medium">
          Charaktere werden geladen…
        </p>
      </div>
    </div>
  );
}
