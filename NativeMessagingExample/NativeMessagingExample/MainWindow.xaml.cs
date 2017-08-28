using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using Newtonsoft.Json;
using Tobii.Interaction;

namespace NativeMessagingTest
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
           
            InitializeComponent();

            Thread inThread = new Thread(ListenForMessages);
            inThread.IsBackground = true;
            inThread.Start();

            Thread outThread = new Thread(SendEyEXData);
            outThread.IsBackground = true;
            outThread.Start();
        }

        void ListenForMessages()
        {
            while (true)
            {
                NativeMessage msg = NativeMessage.Read();

                if (msg.Length > 0)
                {
                    TextMessage tMsg = msg.Get<TextMessage>();

                    txtStdin.Dispatcher.Invoke(() => {
                        txtStdin.Text = tMsg.text;
                    });
                }

                Thread.Sleep(100);
            }
        }

        void SendEyEXData()
        {
            var host = new Host();
            var gazePointDataStream = host.Streams.CreateGazePointDataStream();

            gazePointDataStream.GazePoint((xloc, yloc, ts) =>
            {
                xloc = Math.Round(xloc, 2);
                yloc = Math.Round(yloc, 2);
                NativeMessage msg = new NativeMessage(new EyeXData { x = xloc, y = yloc });
                msg.Send();

            });
        }


        private void button_Click(object sender, RoutedEventArgs e)
        {
            NativeMessage msg = new NativeMessage(new TextMessage { text = txtStdout.Text });
            msg.Send();
        }

        class TextMessage
        {
            public string text;
        }

        class EyeXData
        {
            public double x;
            public double y;
        }
    }
}
