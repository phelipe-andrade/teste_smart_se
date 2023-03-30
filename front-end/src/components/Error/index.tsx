export default function Error(props: {message: string}) {
  return <p style={{color: 'red', fontSize: '1rem', margin: '10px 0'} }>{props.message}</p>
}