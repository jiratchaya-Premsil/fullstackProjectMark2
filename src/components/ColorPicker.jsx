const ColorPicker = () => {

  const changeColor = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <div className="flex gap-3">
      <button onClick={() => changeColor("blue")} className="w-6 h-6 bg-blue-500 rounded-full" />
      <button onClick={() => changeColor("yellow")} className="w-6 h-6 bg-yellow-500 rounded-full" />
      <button onClick={() => changeColor("green")} className="w-6 h-6 bg-green-500 rounded-full" />
      <button onClick={() => changeColor("default")} className="w-6 h-6 bg-red-400 rounded-full" />
    </div>
  );
};

export default ColorPicker;