using NUnit.Framework;

namespace NUnitScaffold
{
    public class Tests
    {
        [SetUp]
        public void SetUp()
        {}

        [Test]
        public void ItIsAlwaysTrue()
        {
            Assert.That(2 + 2, Is.EqualTo(4));
        }

        [Test]
        public void ItIsAlwaysFalse()
        {
            var result = "4";
            Assert.That(2 + 3, Is.EqualTo(4), $"Expected result to be {result}");
        }
    }
}
