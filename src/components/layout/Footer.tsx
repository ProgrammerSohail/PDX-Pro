const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8 mt-12">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <p className="text-gray-600 dark:text-gray-300">
            &copy; {new Date().getFullYear()} Document Processing App
          </p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Privacy</a>
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Terms</a>
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Help</a>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
