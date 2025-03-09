export function throwErrorIfNotOverwrite(){
  const stack = new Error().stack as string;
  const stackLines = stack.split('\n');
  const callerLine = stackLines[7] || '';

  const functionName = callerLine.split(" ")[5]
  throw new Error(
    `Method ${functionName} not overwrited.`
  );
}