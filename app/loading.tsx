import React from 'react';

const Loading = ({ title }: { title: string }) => {
  return (
    <section className="p-4 max-w-screen-xl mx-auto bg-white text-black">
      {/* SECTION TITLE (CATEGORY)*/}
      <div className="flex mb-2">
        <h3 className="pl-3 text-xl font-semibold sm:text-2xl lg:text-2xl">
          카테고리
        </h3>
      </div>

      {/* MOVIE LIST */}
    </section>
  );
};

export default Loading;
