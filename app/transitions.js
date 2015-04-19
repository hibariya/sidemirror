export default function() {
  this.transition(
    this.fromRoute('people.index'),
    this.toRoute('people.others'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}
